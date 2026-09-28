import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

const socialLinks = [
  {
    icon: FiFacebook,
    href: "#",
  },
  {
    icon: FiInstagram,
    href: "#",
  },
  {
    icon: FiTwitter,
    href: "#",
  },
  {
    icon: FiYoutube,
    href: "#",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-3">
      {socialLinks.map(({ icon: Icon, href }, index) => (
        <a
          key={index}
          href={href}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-white
            transition
            hover:bg-orange-500
          "
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}