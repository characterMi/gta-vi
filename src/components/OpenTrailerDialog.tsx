const OpenTrailerDialog = () => {
  return (
    <button
      className="open-trailer-dialog absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 lg:size-[7vw] bg-purple rounded-full hover:scale-110 focus-visible:scale-110 transition-transform outline-none duration-500 cursor-pointer"
      aria-label="Open trailer dialog"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 75 75"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.5 75C58.2107 75 75 58.2107 75 37.5C75 16.7893 58.2107 0 37.5 0C16.7893 0 0 16.7893 0 37.5C0 58.2107 16.7893 75 37.5 75ZM31.6852 27.0487C31.3486 26.8324 30.9208 26.817 30.5696 27.0088C30.2184 27.2005 30 27.5686 30 27.9688V47.6562C30 48.0564 30.2184 48.4245 30.5696 48.6163C30.9208 48.808 31.3486 48.7926 31.6852 48.5763L46.9977 38.7326C47.3107 38.5313 47.5 38.1847 47.5 37.8125C47.5 37.4403 47.3107 37.0937 46.9977 36.8924L31.6852 27.0487Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default OpenTrailerDialog;
