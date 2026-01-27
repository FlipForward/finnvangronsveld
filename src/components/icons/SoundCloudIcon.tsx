interface SoundCloudIconProps {
  size?: number;
  className?: string;
}

const SoundCloudIcon = ({ size = 24, className }: SoundCloudIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
  >
    <path d="M2 14v-2" />
    <path d="M4 16V9" />
    <path d="M6 18V7" />
    <path d="M8 19V5" />
    <path d="M10 19V6" />
    <path d="M12 19V8" />
    <path d="M14 19v-8a3 3 0 0 1 3-3h1a4 4 0 0 1 4 4v4a3 3 0 0 1-3 3h-5" />
  </svg>
);

export default SoundCloudIcon;
