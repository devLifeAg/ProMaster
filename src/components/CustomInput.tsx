import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface Option {
    label: string;
    value: string;
}

interface CustomInputProps {
    label: string;
    required?: boolean;
    type?: 0 | 1 | 2;
    value?: string;
    onChange?: (value: string) => void;
    options?: Option[]; // Cho kiểu 1 (select)
    phoneCode?: string; // Cho kiểu 2 (phone input)
    onPhoneCodeChange?: (code: string) => void; // Cho kiểu 2 (phone input)
    disabled?: boolean;
    placeholder?: string;
     fontSize?: number;
    backgroundColor?: string; // Màu nền input
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    required = false,
    type = 0,
    value,
    onChange,
    options = [],
    phoneCode = '+60',
    onPhoneCodeChange,
    disabled = false,
    placeholder = '',
    backgroundColor = '#FFFFFF', // mặc định white
    fontSize
}) => {

    const inputStyle: React.CSSProperties = {
        color: placeholder != '' ? colors.greyCalm : colors.blackDark,
        width: type === 2 ? '370px' : '450px',
        height: '50px',
        borderRadius: '10px',
        border: `1px solid ${colors.greyCalm}`,
        padding: '11px 15px',
        fontSize: fontSize ? `${fontSize}px` : '20px',
        fontFamily: fonts.outfit,
        opacity: disabled ? 0.5 : 1,
        backgroundColor,
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <label
                className="block mb-1 font-medium"
                style={{
                    color: colors.blackDark,
                    fontSize: 18,
                    fontFamily: fonts.outfit,
                }}
            >
                {label} {required && <span style={{ color: colors.redRuby }}>*</span>}
            </label>

            {type === 1 ? (
                <div style={{ position: 'relative', width: '450px' }}>
                    <select
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}

                        disabled={disabled}
                        style={{
                            color: value === '' ? colors.greyCalm : colors.blackDark,
                            ...inputStyle,

                        }}
                        className="custom-select"
                    >
                        <option value=''>{placeholder}</option>
                        {options.map((opt) => (
                            <option value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    {/* Icon giả lập */}
                    <svg
                        style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                        }}
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.blackDark}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

            ) : type === 2 ? (
                <div className="flex gap-2">
                    <div style={{ position: 'relative' }}>
                        <select
                            value={phoneCode}
                            onChange={(e) => onPhoneCodeChange?.(e.target.value)}
                            disabled={disabled}
                            style={{
                                width: '100px',
                                height: '50px',
                                borderRadius: '10px',
                                border: `1px solid ${colors.greyCalm}`,
                                padding: '11px 10px',
                                fontSize: '18px',
                                fontFamily: fonts.outfit,
                                backgroundColor,
                                opacity: disabled ? 0.5 : 1,
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                color: phoneCode === '' ? colors.greyCalm : colors.blackDark,
                            }}
                        >
                            <option value="">{'Country Code'}</option>
                            <option value="+60">+60</option>
                            <option value="+84">+84</option>
                            <option value="+65">+65</option>
                        </select>

                        <svg
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                            }}
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.blackDark}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>

                    <input
                        type="tel"
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        disabled={disabled}
                        placeholder={placeholder || '0123456789'}
                        style={{
                            ...inputStyle,
                            width: '340px',
                        }}
                    />
                </div>
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    placeholder={placeholder}
                    style={inputStyle}
                />
            )}
        </div>
    );
};

export default CustomInput;
