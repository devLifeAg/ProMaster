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
import { BASE_URL } from '../../constants/consts';
import FixedTopIcons from './FixedTopIcon';

const LanguageDialog = ({ currentLang, onSelect }: { currentLang: string; onSelect: (lang: string) => void }) => {
  const languages = [
    { label: 'English', value: 'en' },
    { label: '繁体中文', value: 'zh-HK' },
    { label: '简体中文', value: 'zh-CN' },
    { label: 'Bahasa Indonesia', value: 'id' },
    { label: 'Tiếng Việt (Vietnam)', value: 'vi' },
  ];

  return (
    <div className="w-60 sm:w-[234px] rounded-3xl border bg-white shadow-lg"
      style={{ border: `1px solid ${colors.greyInputText}`, background: colors.whiteCloud }}>
      {languages.map((lang, index) => (
        <button
          key={lang.value}
          onClick={() => onSelect(lang.value)}
          className={`
            w-full py-3 text-center transition-colors
            ${lang.value === currentLang ? 'font-bold' : ''}
            ${index !== 0 ? 'border-t border-gray-200' : ''}
            ${index === 0 ? 'rounded-t-3xl' : ''}
            ${index === languages.length - 1 ? 'rounded-b-3xl' : ''}
            hover:bg-gray-50
          `}
          style={{
            fontFamily: fonts.outfit,
            color: lang.value === currentLang ? colors.redRuby : colors.blackDark
          }}
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
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile(); // kiểm tra lần đầu khi load
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const handleCloseSettings = () => {
    setAnimationSetting('closing');
    setTimeout(() => {
      setShowSettings(false);
      setAnimationSetting('open');
    }, 300);
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
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    const deviceInfo = await getDeviceInfo();

    const payload = {
      userName,
      password,
      languageId: 1,
      ...deviceInfo
    };

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
    <>
      {/* Fixed Icon Layer */}
      {/* Fixed Icon Layer */}
      {(!isMobile || (isMobile && showLogin)) && (
        <FixedTopIcons
          onLanguage={() => setShowLanguage(prev => !prev)}
          onSettings={() => setShowSettings(true)}
        />
      )}


      <div className="flex flex-col lg:flex-row w-screen h-screen relative"
        style={{ background: colors.redGradient() }}>

        {/* Overlay cho Language */}
        {showLanguage && (
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowLanguage(false)}
          ></div>
        )}


        {/* Language Dropdown - Responsive positioning */}
        {showLanguage && (
          <div ref={langRef} className="absolute top-16 sm:top-20 left-4 sm:left-8 z-50">
            <LanguageDialog
              currentLang={currentLang}
              onSelect={(lang: string) => {
                setCurrentLang(lang);
                setShowLanguage(false);
              }}
            />
          </div>
        )}

        {/* Settings Dialog - Responsive */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
            <div
              ref={settingsRef}
              className={`
              bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto
              ${animationSetting === 'open' ? 'animate-slideUp' : 'animate-slideDown'}
            `}
            >
              <div className="mb-6 flex items-center gap-2">
                <FaCog size={20} className="text-red-600" />
                <h3 style={{
                  fontFamily: fonts.outfit,
                  fontWeight: 700,
                  fontSize: 18,
                  color: colors.blackDark
                }}>
                  Setting
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <div
                    className="mb-2"
                    style={{
                      fontFamily: fonts.outfit,
                      fontWeight: 500,
                      fontSize: 16,
                      color: colors.blackDark
                    }}
                  >
                    Add your server address
                  </div>
                  <input
                    type="text"
                    className="w-full h-12 border rounded-lg px-3 text-sm sm:text-base"
                    style={{
                      border: `1px solid ${colors.greyCalm}`,
                      fontFamily: fonts.outfit
                    }}
                  />
                </div>

                <div>
                  <div
                    className="mb-2"
                    style={{
                      fontFamily: fonts.outfit,
                      fontWeight: 500,
                      fontSize: 16,
                      color: colors.blackDark
                    }}
                  >
                    Name your server address
                  </div>
                  <input
                    type="text"
                    className="w-full h-12 border rounded-lg px-3 text-sm sm:text-base"
                    style={{
                      border: `1px solid ${colors.greyCalm}`,
                      fontFamily: fonts.outfit
                    }}
                  />
                </div>
              </div>

              <div className="text-center mb-6"
                style={{
                  fontFamily: fonts.outfit,
                  color: colors.greyShadow,
                  fontSize: 16,
                  fontWeight: 500
                }}>
                or
              </div>

              <div className="mb-6">
                <p className="mb-3"
                  style={{
                    fontFamily: fonts.outfit,
                    color: colors.blackDark,
                    fontWeight: 500,
                    fontSize: 16
                  }}>
                  Choose from recent connections.
                </p>

                {['Name 1', 'Name 2', 'Name 3', 'Name 4'].map((name, index) => (
                  <div key={index} className="flex items-center justify-between mb-3 border border-gray-200 rounded-lg px-3 sm:px-4 py-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-gray-700 truncate text-sm sm:text-base"
                        style={{ fontFamily: fonts.outfit }}>
                        {name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate"
                        style={{ fontFamily: fonts.outfit }}>
                        {index % 2 === 0
                          ? 'https://www3.mhw.com.my:1602/RRCIS'
                          : 'https://www2.mhw.com.my/RRCISDe'}
                      </div>
                    </div>

                    <input className="hidden" type="checkbox" id={`check-round0${index}`} />
                    <label htmlFor={`check-round0${index}`} className="flex items-center cursor-pointer flex-shrink-0">
                      <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"></span>
                    </label>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-3 rounded-full font-bold text-white mb-3 transition-colors hover:opacity-90"
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

              <div className="text-center text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                onClick={handleCloseSettings}
                style={{ fontFamily: fonts.outfit }}>
                Cancel
              </div>
            </div>
          </div>
        )}

        {/* Warning Dialog - Responsive */}
        {showWarning && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative">
              <img
                src={warningImg}
                alt="warning"
                className="w-16 h-16 sm:w-20 sm:h-20 absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2"
              />

              <div className="bg-white p-4 sm:p-6 shadow-2xl rounded-3xl w-full max-w-sm mx-auto">
                <div className="flex flex-col items-center mt-8 sm:mt-10">
                  <h3 style={{
                    fontFamily: fonts.outfit,
                    fontWeight: 700,
                    fontSize: 20,
                    color: colors.warningTitle
                  }}>
                    Warning
                  </h3>

                  <p className="text-center mb-6 px-2"
                    style={{
                      fontFamily: fonts.outfit,
                      fontSize: 14,
                      color: colors.greyShadow,
                      fontWeight: 400,
                      lineHeight: 1.4
                    }}>
                    You are switching to a different server, it will clean all your previous offline ticket data.
                    <br />
                    Are you sure?
                  </p>

                  <button
                    className="w-full py-3 rounded-full font-bold text-white mb-3 transition-colors hover:opacity-90"
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
                    className="text-center text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
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

        {/* Left Panel - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <div className="bg-white flex flex-col items-center justify-end"
            style={{ width: 424, height: 576, borderRadius: 20 }}>
            <div className='flex flex-row gap-2 mb-4'>
              <div className="rounded-full"
                style={{ width: 30, height: 6, background: colors.greyInputText }}></div>
              <div className="rounded-full"
                style={{ width: 6, height: 6, background: colors.greyInputText }}></div>
              <div className="rounded-full"
                style={{ width: 6, height: 6, background: colors.greyInputText }}></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form - Responsive */}
        {showLogin && (
          <div className={`w-full lg:w-1/2 p-4 sm:p-8 lg:p-12 flex items-center flex-col justify-center min-h-screen lg:min-h-0 ${animationLogin === 'open' ? 'animate-slideIn' : 'animate-slideOut'}`}
            style={{ background: colors.whiteCloud }}>
            <div className="w-full max-w-md">
              <h2
                className="mb-6 sm:mb-8 text-center lg:text-left"
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
                  label="Username"
                  name="userName"
                  required
                />

                <CustomInput
                  label="Password"
                  name="password"
                  inputType={'password'}
                  required
                />

                <div className="flex items-center">
                  <input className="hidden" type="checkbox" id="check-round01" />
                  <label htmlFor="check-round01" className="flex items-center cursor-pointer">
                    <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"></span>
                    <span className="ml-3 text-sm sm:text-base"
                      style={{ fontFamily: fonts.inter, color: colors.greyIron }}>
                      Remember me
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmit}
                  className="w-full font-bold cursor-pointer rounded-full transition-all hover:opacity-90 disabled:opacity-50 text-base sm:text-lg"
                  style={{
                    background: isSubmit ? colors.greyCalm : colors.redRuby,
                    fontSize: 18,
                    fontFamily: fonts.outfit,
                    color: colors.whiteCloud,
                    height: 48,
                    minHeight: 48
                  }}
                >
                  {isSubmit ? "Logging in..." : "Log In"}
                </button>

                <div className="text-center text-sm sm:text-base"
                  style={{ fontFamily: fonts.outfit, color: colors.greyInputText }}>
                  <a href="#" className="hover:underline">Forgot Password?</a>
                </div>

                <div className="text-center text-sm sm:text-base"
                  style={{ fontFamily: fonts.outfit, color: colors.greyInputText }}>
                  Don't have an account?{' '}
                  <span
                    onClick={() => handleCloseLogin(true)}
                    className="hover:underline transition-colors"
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
          </div>
        )}

        {/* Sign Up Form - Responsive */}
        {showSignUp && (
          <div className={`w-full lg:w-1/2 p-4 sm:p-8 lg:p-12 flex items-center flex-col justify-start overflow-y-auto ${animationLogin === 'closing' ? 'animate-slideIn' : 'animate-slideOut'}`}
            style={{
              background: colors.whiteCloud,
              maxHeight: '100vh',
              minHeight: '100vh'
            }}>
            <div className="w-full max-w-md pt-16 lg:pt-0">
              <h2
                className="mb-6 sm:mb-8 text-center lg:text-left"
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
                  label="Register Date"
                  value='28/03/2025 9:41 AM'
                  disabled={true}
                  required
                  backgroundColor={colors.greyLight}
                />

                <div>
                  <label
                    className="block mb-2 font-medium"
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
                    className="w-full rounded-lg border px-3 py-3 resize-none text-xs sm:text-sm"
                    style={{
                      backgroundColor: colors.greyLight,
                      border: `1px solid ${colors.greyCalm}`,
                      fontFamily: fonts.outfit,
                      opacity: 0.5,
                      lineHeight: '1.5',
                      minHeight: '80px',
                    }}
                  />
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <span className="text-sm sm:text-base"
                    style={{ fontFamily: fonts.inter, color: colors.greyIron }}>
                    Agree
                  </span>

                  <input className="hidden" type="checkbox" id="check-round-signup" />
                  <label htmlFor="check-round-signup" className="cursor-pointer">
                    <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"></span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full font-bold rounded-full transition-all hover:opacity-90 mt-8 text-base sm:text-lg"
                  style={{
                    background: colors.redRuby,
                    fontSize: 18,
                    fontFamily: fonts.outfit,
                    color: colors.whiteCloud,
                    height: 48,
                    minHeight: 48
                  }}
                >
                  Sign Up
                </button>

                <div className="text-center text-sm sm:text-base"
                  style={{ fontFamily: fonts.outfit, color: colors.greyInputText }}>
                  Already have an account?{' '}
                  <span
                    onClick={() => handleCloseLogin(false)}
                    className="hover:underline transition-colors"
                    style={{
                      fontFamily: fonts.outfit,
                      color: colors.redRuby,
                      cursor: 'pointer'
                    }}
                  >
                    Login
                  </span>
                </div>

                <div className="text-center text-xs text-gray-400 mt-8 pb-8">
                  v.20250101s by REACT
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>

  );
};

export default Login;