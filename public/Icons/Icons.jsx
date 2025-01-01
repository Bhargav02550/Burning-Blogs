import React from "react";

const UserAdd01Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
    {...props}
  >
    <path
      d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.9871 10.2401 20.8194 9.05112 20.484C6.18961 19.6769 3.70555 18.3204 3.10956 15.2816C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27704 3.10956 8.71845C3.70555 5.67963 6.18961 4.32314 9.05112 3.516C10.2401 3.18062 10.8346 3.01293 11.3156 3.00116C13.3831 2.95058 14.9264 4.52305 15 6.37499"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 12H21M10 12C10 11.2998 11.9943 9.99153 12.5 9.5M10 12C10 12.7002 11.9943 14.0085 12.5 14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color={props.color}
    fill="none"
  >
    <path
      d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
    />
  </svg>
);

const RegisterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.67837 14.2307 10.1368 13.7719 12.5 14.1052C13.3575 14.2261 14.1926 14.4514 15 14.7809"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M18.5 22L18.5 15M15 18.5H22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const GoogleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="2500"
    width="2500"
    viewBox="1 1 22 22"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const GmailIcon = (props) => (
  <svg
    overflow="scroll"
    viewBox="7.591810019517593 13.58045115719796 48.539913655659916 36.419548842802044"
    xmlns="http://www.w3.org/2000/svg"
    width="2500"
    height="1394"
  >
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1="14.001"
      x2="32"
      y1="30.744"
      y2="30.744"
    >
      <stop offset="0" stopColor="#c8c8c8" />
      <stop offset="1" stopColor="#cdcdcd" />
    </linearGradient>
    <linearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1="28.665"
      x2="50"
      y1="36.447"
      y2="36.447"
    >
      <stop offset="0" stopColor="#d9d9d9" />
      <stop offset="1" stopColor="#e2e2e2" />
    </linearGradient>
    <path
      d="M53 50H11a3 3 0 0 1-3-3V17a3 3 0 0 1 3-3h42a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3z"
      fill="#eaeaea"
    />
    <path d="M14 50h-3a3 3 0 0 1-3-3V17a3 3 0 1 1 6 0z" fill="#d54c3f" />
    <path d="M50 50h3a3 3 0 0 0 3-3V17a3 3 0 1 0-6 0z" fill="#b63524" />
    <path
      d="M54.718 19.46a3 3 0 1 0-3.436-4.92l-19.28 14.037-.002.001-.002-.001-19.28-14.037a3 3 0 0 0-3.436 4.92l-.08-.059L32 36M54.799 19.401L32 36"
      fill="#de5145"
    />
    <path
      d="M53 14c-.639 0-1.232.2-1.718.54l-19.28 14.037-.002.001-.002-.001-19.28-14.037A2.988 2.988 0 0 0 11 14z"
      fill="#efefef"
    />
    <path
      d="M14.001 24.188L8.945 19.18l-.002.004c.106.1.219.192.339.276l-.08-.059 4.8 3.495-.001 1.328"
      fill="#c64132"
    />
    <path d="M28.668 38.591L14 50l.001-25.937 14.664 14.524" fill="#e3e3e3" />
    <path
      d="M28.668 38.591L32 36 14.001 22.896v1.167l14.664 14.524z"
      fill="url(#a)"
    />
    <path d="M40.061 50H50V22.895L32 36l-3.335 2.587z" fill="url(#b)" />
  </svg>
);

export {
  UserAdd01Icon,
  LogoutIcon,
  ProfileIcon,
  RegisterIcon,
  GoogleIcon,
  GmailIcon,
};
