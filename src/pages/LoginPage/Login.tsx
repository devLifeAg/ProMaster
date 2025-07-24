import React, { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaCog } from 'react-icons/fa';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import warningImg from '../../assets/warning.png';
import CustomInput from '../../components/CustomInput';
import { getDeviceInfo } from "./getDeviceInfo";
import { showSuccessToast, showErrorToast } from '../../components/ToasService';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {BASE_URL} from '../../constants/consts';

const LanguageDialog = ({ currentLang, onSelect }: { currentLang: string; onSelect: (lang: string) => void }) => {
  const languages = [
    { label: 'English', value: 'en' },
    { label: '繁体中文', value: 'zh-HK' },
    { label: '简体中文', value: 'zh-CN' },
    { label: 'Bahasa Indonesia', value: 'id' },
    { label: 'Tiếng Việt (Vietnam)', value: 'vi' },
  ];

  return (
    <div style={{ width: 234, borderRadius: 20, border: `1px solid ${colors.greyInputText}`, background: colors.whiteCloud }}>
      {languages.map((lang, index) => (
        <button
          key={lang.value}
          onClick={() => onSelect(lang.value)}
          className={`
            w-full py-3 text-center 
            ${lang.value === currentLang ? 'font-bold' : ''}
            ${index !== 0 ? 'border-t border-gray-200' : ''}
          `}
          style={{ fontFamily: fonts.outfit, color: lang.value === currentLang ? colors.redRuby : colors.blackDark }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

const Login: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [animationLogin, setAnimationLogin] = useState<'open' | 'closing'>('open');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [blockOutsideClick, setBlockOutsideClick] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const [animationSetting, setAnimationSetting] = useState<'open' | 'closing'>('open');
  const [currentLang, setCurrentLang] = useState('en');

  const langRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Click outside để đóng Language hoặc Settings
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockOutsideClick) return;
      if (showLanguage && langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLanguage(false);
      }
      if (showSettings && settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        handleCloseSettings();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguage, showSettings, blockOutsideClick]);

  const handleCloseSettings = () => {
    setAnimationSetting('closing');
    setTimeout(() => {
      setShowSettings(false);
      setAnimationSetting('open');
    }, 300); // match with animation duration
  };

  const handleCloseLogin = (isOpen: boolean) => {
    if (isOpen) {
      setShowLogin(false);
      setAnimationLogin('closing');
      setShowSignUp(true);
    } else {
      setShowSignUp(false);
      setAnimationLogin('open');
      setShowLogin(true);
    };
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    const deviceInfo = await getDeviceInfo(); // giả sử đã có hàm này

    const payload = {
      userName,
      password,
      languageId: 1,
      ...deviceInfo
    };

    // console.log("📦 Payload gửi đi:\n" + JSON.stringify(payload, null, 2));
    // showSuccessToast("Login success!");
    // navigate('/Dashboard');
    try {
      const res = await axios.post(`${BASE_URL}promasterauthentication/login`, payload);

      if (res.status === 200) {
        showSuccessToast("Login success!");
        navigate('/Dashboard');
        setIsSubmit(false);
      } else {
        showErrorToast("Login fail");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      showErrorToast(
        error.response?.data?.message || 'Login failed'
      );
        setIsSubmit(false);

    }
  };



  return (
    <div className="flex w-screen h-screen relative" style={{ background: colors.redGradient() }}>

      {/* Overlay cho Language */}
      {showLanguage && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setShowLanguage(false)}
        ></div>
      )}

      {/* Icon top-left */}
      <div className="absolute top-8 left-8 flex gap-5 z-50">
        <FaGlobe
          size={30}
          className="text-white cursor-pointer"
          onClick={() => setShowLanguage(prev => !prev)}
        />
        <FaCog
          size={30}
          className="text-white cursor-pointer"
          onClick={() => setShowSettings(true)}
        />
      </div>

      {/* Language Dropdown */}
      {showLanguage && (
        <div ref={langRef} className="absolute top-20 left-8 z-50">
          <LanguageDialog
            currentLang={currentLang}
            onSelect={(lang: string) => {
              setCurrentLang(lang);
              setShowLanguage(false);
            }}
          />
        </div>
      )}

      {/* Settings Dialog */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
          <div
            ref={settingsRef}
            className={`
        bg-white rounded-2xl shadow-2xl p-6 
        ${animationSetting === 'open' ? 'animate-slideUp' : 'animate-slideDown'}
      `}
            style={{ width: 630, height: 717 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <FaCog size={20} className="text-red-600" />
              <h3 style={{ fontFamily: fonts.outfit, fontWeight: 700, fontSize: 18, color: colors.blackDark }}>Setting</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div
                  style={{ fontFamily: fonts.outfit, fontWeight: 500, fontSize: 18, color: colors.blackDark, marginBottom: 5 }}
                >
                  Add your server address
                </div>
                <input
                  type="text"
                  style={{
                    width: 278, height: 50, border: `1px solid ${colors.greyCalm}`, borderRadius: 10
                  }}
                />
              </div>

              <div>
                <div
                  style={{ fontFamily: fonts.outfit, fontWeight: 500, fontSize: 18, color: colors.blackDark, marginBottom: 5 }}
                >
                  Name your server address
                </div>
                <input
                  type="text"
                  style={{
                    width: 278, height: 50, border: `1px solid ${colors.greyCalm}`, borderRadius: 10
                  }}
                />
              </div>
            </div>

            <div className="text-center mb-6" style={{ fontFamily: fonts.outfit, color: colors.greyShadow, fontSize: 16, fontWeight: 500 }}>or</div>

            <div className="mb-6">
              <p className="mb-3 text-gray-500" style={{ fontFamily: fonts.outfit, color: colors.blackDark, fontWeight: 500, fontSize: 16 }}>
                Choose from recent connections.
              </p>

              {['Name 1', 'Name 2', 'Name 3', 'Name 4'].map((name, index) => (
                <div key={index} className="flex items-center justify-between mb-3 border border-gray-200 rounded-lg px-4 py-3">
                  <div>
                    <div className="font-bold text-gray-700" style={{ fontFamily: fonts.outfit }}>{name}</div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: fonts.outfit }}>
                      {index % 2 === 0
                        ? 'https://www3.mhw.com.my:1602/RRCIS'
                        : 'https://www2.mhw.com.my/RRCISDe'}
                    </div>
                  </div>

                  <input className="hidden me-4" type="checkbox" id={`check-round0${index}`} />
                  <label htmlFor={`check-round0${index}`} className="flex items-center h-10 px-2 rounded cursor-pointer">
                    <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"></span>
                  </label>
                </div>
              ))}
            </div>

            <button
              className="w-full py-3 rounded-full font-bold text-white mb-3"
              style={{
                background: colors.redRuby,
                fontFamily: fonts.outfit,
                fontSize: 16
              }}
              onClick={() => {
                setShowWarning(true);
                setBlockOutsideClick(true);
              }}
            >
              Save Setting
            </button>

            <div className="text-center text-gray-500 cursor-pointer" onClick={handleCloseSettings} style={{ fontFamily: fonts.outfit }}>
              Cancel
            </div>
          </div>
        </div>
      )}

      {showWarning && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="relative">
            {/* Icon Warning nửa trong nửa ngoài */}
            <img
              src={warningImg}
              alt="warning"
              style={{
                width: 78,
                height: 78,
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)', // Center + nửa trên nửa dưới
              }}
            />

            <div className="bg-white p-4 shadow-2xl" style={{ width: 342, height: 259, borderRadius: 20, }}>
              <div className="flex flex-col items-center mt-8">
                <h3 style={{ fontFamily: fonts.outfit, fontWeight: 700, fontSize: 20, color: colors.warningTitle }}>Warning</h3>

                <p style={{ fontFamily: fonts.outfit, fontSize: 14, color: colors.greyShadow, fontWeight: 400, textAlign: 'center', marginBottom: 20 }}>
                  You are switching to a different server, it will clean all your previous offline ticket data.<br />
                  Are you sure?
                </p>

                <button
                  className="w-full py-3 rounded-full font-bold text-white mb-3"
                  style={{
                    background: colors.redRuby,
                    fontFamily: fonts.outfit,
                    fontSize: 16
                  }}
                  onClick={() => {
                    setShowWarning(false);
                    setShowSettings(false);
                    setBlockOutsideClick(false);
                  }}
                >
                  OK
                </button>

                <div
                  className="text-center text-gray-500 cursor-pointer"
                  onClick={() => {
                    setShowWarning(false);
                    setBlockOutsideClick(false);
                  }}
                  style={{ fontFamily: fonts.outfit }}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>

      )}




      {/* Left Panel - Tablet Mockup */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white flex flex-col items-center justify-end" style={{ width: 424, height: 576, borderRadius: 20 }}>
          <div className='flex flex-row gap-2 mb-4'>
            <div className="rounded-full" style={{ width: 30, height: 6, background: colors.greyInputText }}></div>
            <div className="rounded-full" style={{ width: 6, height: 6, background: colors.greyInputText }}></div>
            <div className="rounded-full" style={{ width: 6, height: 6, background: colors.greyInputText }}></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      {showLogin && (<div className={`w-1/2 p-12 flex items-center flex-col justify-center ${animationLogin === 'open' ? 'animate-slideIn' : 'animate-slideOut'}`}
        style={{ background: colors.whiteCloud }}
      >
        <div>
          <h2
            className="mb-8"
            style={{
              color: colors.redRuby,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: fonts.outfit,
              lineHeight: 1,
              letterSpacing: '0',
            }}
          >
            Log In
          </h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <CustomInput
              label="Username" name="userName"
              required
            />

            <CustomInput
              label="Password" name="password" inputType={'password'}
              required
            />

            <input className="hidden me-4" type="checkbox" id="check-round01" />
            <label htmlFor="check-round01" className="flex items-center h-10 px-2 rounded cursor-pointer">
              <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"></span>
              <span className="ml-3" style={{ fontSize: 16, fontFamily: fonts.inter, color: colors.greyIron }}>Remember me</span>
            </label>

            <button
              type="submit"
              disabled={isSubmit}
              className="mx-auto font-bold cursor-pointer block" onClick={() => handleLogin}
              style={{ background: isSubmit ? colors.greyCalm : colors.redRuby, fontSize: 18, fontFamily: fonts.outfit, color: colors.whiteCloud, width: 352, height: 48, borderRadius: 30 }}
            >
              {isSubmit ? "Logging in..." : "Log In"}
            </button>

            <div style={{ fontSize: 16, fontFamily: fonts.outfit, color: colors.greyInputText, textAlign: 'center', marginBottom: 48 }}>
              <a href="#">Forgot Password?</a>
            </div>

            <div style={{ fontSize: 16, fontFamily: fonts.outfit, color: colors.greyInputText, textAlign: 'center', marginBottom: 24 }}>
              Don't have an account?{' '}
              <span
                onClick={() => handleCloseLogin(true)}
                style={{
                  fontFamily: fonts.outfit,
                  color: colors.redRuby,
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </span>

            </div>

            <div className="text-center text-xs text-gray-400 mt-8">
              v.20250101s by REACT
            </div>
          </form>
        </div>
      </div>)}

      {showSignUp && (
        <div className={`w-1/2 p-12 flex items-center flex-col items-center ${animationLogin === 'closing' ? 'animate-slideIn' : 'animate-slideOut'}`}
          style={{
            background: colors.whiteCloud,
            overflowY: 'auto',           // Cho phép scroll dọc
            maxHeight: '100vh',           // Giới hạn chiều cao màn hình
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <div>
            <h2
              className="mb-8"
              style={{
                color: colors.redRuby,
                fontSize: 20,
                fontWeight: 700,
                fontFamily: fonts.outfit,

              }}
            >
              Create Account
            </h2>

            <form className="space-y-6">
              <CustomInput
                label="Salutation"
                required
                type={1}
                placeholder='Select salutation'
                options={[
                  { label: 'salutation 1', value: '1' },
                  { label: 'salutation 2', value: '2' },
                ]}
              />
              <CustomInput
                label="Name"
                required
              />
              <CustomInput
                label="ID Type"
                required
                type={1}
                placeholder='Select ID Type'
                options={[
                  { label: 'ID Type 1', value: '1' },
                  { label: 'ID Type 2', value: '2' },
                ]}
              />
              <CustomInput
                label="ID No"
                required
                type={1}
                options={[
                  { label: 'ID No 1', value: '1' },
                  { label: 'ID No 2', value: '2' },
                ]}
              />

              <CustomInput
                label="Contact No. 1"
                required
                type={2}
              />

              <CustomInput
                label="Contact No. 2"
                type={2}
              />
              <CustomInput
                label="Email"
                required
                placeholder="xxx@gmail.com"
              />


              <CustomInput
                label="Resigter Date"
                value='28/03/2025 9:41 AM'
                disabled={true}
                required
                backgroundColor={colors.greyLight}
              />

              <div>
                <label
                  className="block mb-1 font-medium"
                  style={{
                    color: colors.blackDark,
                    fontSize: 18,
                    fontFamily: fonts.outfit,
                  }}
                >
                  PDPA Clause <span style={{ color: colors.redRuby }}>*</span>
                </label>

                <textarea
                  value="We require your consent in accordance with Personal Data Protection Act to comply with the PDPA's obligations for processing your personal data for this event."
                  disabled
                  style={{
                    width: '450px',
                    backgroundColor: colors.greyLight,
                    borderRadius: '10px',
                    border: `1px solid ${colors.greyCalm}`,
                    padding: '11px 15px',
                    fontSize: '12px',
                    fontFamily: fonts.outfit,
                    opacity: 0.5,
                    whiteSpace: 'pre-wrap',
                    resize: 'none',
                    overflowY: 'auto',
                    lineHeight: '1.5',
                    minHeight: '80px',
                  }}
                />
              </div>

              <div className="flex items-center justify-end space-x-3">
                <span style={{ fontSize: 16, fontFamily: fonts.inter, color: colors.greyIron }}>
                  Agree
                </span>

                <input className="hidden" type="checkbox" id="check-round01" />

                <label htmlFor="check-round01" className="cursor-pointer">
                  <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"></span>
                </label>
              </div>




              <button
                type="submit"
                className="mx-auto font-bold block mt-20"
                style={{ background: colors.redRuby, fontSize: 18, fontFamily: fonts.outfit, color: colors.whiteCloud, width: 352, height: 48, borderRadius: 30 }}
              >
                Sign Up
              </button>

              <div style={{ fontSize: 16, fontFamily: fonts.outfit, color: colors.greyInputText, textAlign: 'center', marginBottom: 24 }}>
                Already have an account?{' '}
                <span
                  onClick={() => handleCloseLogin(false)}
                  style={{
                    fontFamily: fonts.outfit,
                    color: colors.redRuby,
                    cursor: 'pointer'
                  }}
                >
                  Login
                </span>

              </div>

              <div className="text-center text-xs text-gray-400 mt-8">
                v.20250101s by REACT
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
};

export default Login;
