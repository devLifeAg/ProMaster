import React from 'react';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

interface Option {
    label: string;
    value: string;
}

interface CustomInputProps {
    name?: string;
    inputType?: string;
    label: string;
    required?: boolean;
    type?: 0 | 1 | 2;
    value?: string;
    onChange?: (value: string) => void;
    options?: Option[];
    phoneCode?: string;
    onPhoneCodeChange?: (code: string) => void;
    disabled?: boolean;
    placeholder?: string;
    fontSize?: number;
    backgroundColor?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    name,
    label,
    inputType = 'text',
    required = false,
    type = 0,
    value,
    onChange,
    options = [],
    phoneCode = '+60',
    onPhoneCodeChange,
    disabled = false,
    placeholder = '',
    backgroundColor = '#FFFFFF',
    fontSize
}) => {

    const inputStyle: React.CSSProperties = {
        color: placeholder !== '' ? colors.greyCalm : colors.blackDark,
        width: '100%',
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
                <div className="relative w-full" style={{ maxWidth: 450 }}>
                    <select
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        disabled={disabled}
                        style={{
                            ...inputStyle,
                            color: value === '' ? colors.greyCalm : colors.blackDark,
                            appearance: 'none',
                        }}
                        className="w-full"
                    >
                        <option value=''>{placeholder}</option>
                        {options.map((opt, index) => (
                            <option key={index} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

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
                <div className="flex flex-wrap gap-2 w-full" style={{ maxWidth: 450 }}>
                    <div className="relative" style={{ flex: '0 0 100px' }}>
                        <select
                            value={phoneCode}
                            onChange={(e) => onPhoneCodeChange?.(e.target.value)}
                            disabled={disabled}
                            style={{
                                width: '100%',
                                height: '50px',
                                borderRadius: '10px',
                                border: `1px solid ${colors.greyCalm}`,
                                padding: '11px 10px',
                                fontSize: '18px',
                                fontFamily: fonts.outfit,
                                backgroundColor,
                                opacity: disabled ? 0.5 : 1,
                                appearance: 'none',
                                color: phoneCode === '' ? colors.greyCalm : colors.blackDark,
                            }}
                        >
                            <option value="">Country Code</option>
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

                    <div style={{ flex: '1 1 auto' }}>
                        <input
                            type="tel"
                            value={value}
                            onChange={(e) => onChange?.(e.target.value)}
                            disabled={disabled}
                            placeholder={placeholder || '0123456789'}
                            style={inputStyle}
                        />
                    </div>
                </div>
            ) : (
                <input
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    placeholder={placeholder}
                    style={{ ...inputStyle, maxWidth: 450 }}
                    className="w-full"
                />
            )}
        </div>
    );
};

export default CustomInput;
