import { useEffect, useState } from "react";
import ShowcaseItem from "../../items/ShowCaseItem";
import fonts from '../../styles/fonts';
import colors from "../../styles/colors";
import { BASE_URL } from "../../constants/consts";
import axios from "axios";
import { fetchAndExtractImages } from "../../utils/FetchAndExtractImages";

type ShowcaseAPIItem = {
  ticketId: number;
  projectId: number;
  projectGroupName: string;
  projectName: string;
  projectAddress: string;
  isFeature: boolean;
  photo: string;
  tagId: number;
  tagName: string;
  unitStatus: string;
};

type ShowcaseGroupedData = {
  section: string;
  items: ShowcaseAPIItem[];
};

export default function ShowcaseContent() {
  const [groupedData, setGroupedData] = useState<ShowcaseGroupedData[]>([]);
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${BASE_URL}promastershowcase/getallprojectwithfilters`,
          {
            tagName: "",
            projectGroupName: "",
            type: "",
            tenure: "",
            state: ""
          }, {
          headers: {
            AccessToken: accessToken,
          },
        });

        const projects: ShowcaseAPIItem[] = response.data.result.allprojects;

        // Group by projectGroupName
        const groups: Record<string, ShowcaseAPIItem[]> = {};
        projects.forEach(p => {
          if (!groups[p.projectGroupName]) groups[p.projectGroupName] = [];
          groups[p.projectGroupName].push(p);
        });

        const grouped: ShowcaseGroupedData[] = Object.entries(groups).map(([groupName, items]) => ({
          section: groupName,
          items
        }));

        setGroupedData(grouped);
        setIsLoading(false);

        // fetch images
        const photoList = projects
          .map(p => p.photo)
          .filter(p => !!p?.trim());

        if (photoList.length > 0) {
          fetchAndExtractImages(photoList, accessToken || '', BASE_URL)
            .then(setImageMap)
            .catch(() => console.warn("Image fetch failed"));
        }
      } catch (error) {
        console.error("Failed to fetch showcase data:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-10 w-full">
      <div className="col-span-10 mt-4 w-full">
        {isLoading ? (
          // Display skeleton while loading or not have images yet
          <>
            {Array.from({ length: 3 }).map((_, sectionIndex) => (
              <div key={sectionIndex} className="w-full">
                {/* Section skeleton header */}
                <div
                  className="px-4 py-2 mt-9 h-8 animate-pulse"
                  style={{ background: colors.redRuby, opacity: 0.4 }}
                />

                {/* Showcase skeleton items */}
                <div className="w-full overflow-x-auto">
                  <div className="flex gap-4 p-4 w-max">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="min-w-[320px] h-[280px] bg-gray-200 animate-pulse rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          // Render real data
          groupedData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="w-full">
              {/* Section header */}
              <div
                className="px-4 py-2 mt-9 flex items-center gap-2"
                style={{
                  color: colors.whiteCloud,
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: fonts.outfit,
                  background: colors.redRuby,
                }}
              >
                {section.section}
              </div>

              {/* Showcase items */}
              <div className="w-full overflow-x-auto">
                <div className="flex gap-4 p-4 w-max">
                  {section.items.map((item) => {
                    const imageSrc = imageMap[item.photo]; // undefined if null
                    const isImageReady = Object.keys(imageMap).length > 0;
                    return (
                      <ShowcaseItem
                        key={item.ticketId}
                        title={item.projectName}
                        tag={item.tagId}
                        pinned={false}
                        loadImageDone={isImageReady}
                        image={imageSrc} // fallback in ShowCaseItem if undefined
                        availability={item.unitStatus === '' ? undefined : item.unitStatus}
                        address={item.projectAddress === '' ? undefined : item.projectAddress}
                      />
                    );
                  })}

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

}
