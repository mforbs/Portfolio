import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineFileOpen, MdOutlineOpenInNew } from "react-icons/md";
import {
  SiC,
  SiCplusplus,
  SiDotnet,
  SiGithub,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiSass,
  SiTypescript,
} from "react-icons/si";

export type QuickIconType =
  | "open-file"
  | "github"
  | "open"
  | "external-link"
  | "python"
  | "c++"
  | "c"
  | "react"
  | "typescript"
  | "next.js"
  | "scss"
  | ".net"
  | "sql";

interface QuickIconProps {
  icon: QuickIconType;
  iconProps?: any;
}

export default function QuickIcon(props: QuickIconProps) {
  const { icon, iconProps } = props;
  switch (icon) {
    case "open-file":
      return <MdOutlineFileOpen {...iconProps} />;
    case "external-link":
      return <MdOutlineOpenInNew {...iconProps} />;
    case "github":
      return <SiGithub {...iconProps} />;
    case "open":
      return <FiArrowUpRight {...iconProps} />;
    case "python":
      return <SiPython {...iconProps} />;
    case "c++":
      return <SiCplusplus {...iconProps} />;
    case "c":
      return <SiC {...iconProps} />;
    case "react":
      return <SiReact {...iconProps} />;
    case "typescript":
      return <SiTypescript {...iconProps} />;
    case "next.js":
      return <SiNextdotjs {...iconProps} />;
    case "scss":
      return <SiSass {...iconProps} />;
    case ".net":
      return <SiDotnet {...iconProps} />;
    case "sql":
      return <SiMysql {...iconProps} />;
  }
}
