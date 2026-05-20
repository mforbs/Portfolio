import styles from "./card.module.scss";
import QuickIcon, { QuickIconType } from "@/app/shared/quickIcon/quickIcon";
import Tooltip from "@/app/shared/tooltip/tooltip";
import Image from "next/image";
import Link from "next/link";

type Project = {
  name: string;
  description?: string;
  imagePath?: string;
  imageDimensions?: {
    width: number;
    height: number;
  };
  stack?: string[];
  link?: string;
};

type Props = {
  item: Project;
  offset: number;
};

export default function ProjectCard({ item, offset }: Props) {
  const state = (() => {
    switch (offset) {
      case 0:
        return styles.active;
      case -1:
        return styles.peeking;
      case -2:
        return styles.peeking2;
      default:
        return styles.hiddenBelow;
    }
  })();

  return (
    <div className={`${styles.card} ${state}`}>
      {item.imagePath && (
        <Image
          width={item.imageDimensions?.width}
          height={item.imageDimensions?.height}
          src={item.imagePath}
          className={styles.image}
          alt={item.name}
        />
      )}
      <div className={styles.cardMain}>
        <p className="montserrat">{item.description}</p>
        <div className={styles.cardFooter}>
          <div className={styles.stack}>
            {item.stack?.map((tech, i) => (
              <Tooltip key={i} label={tech}>
                <QuickIcon icon={tech.toLowerCase() as QuickIconType} />
              </Tooltip>
            ))}
          </div>
          {!!item.link && (
            <Link href={item.link} target="_blank" rel="noopener noreferrer">
              <QuickIcon
                icon={"open"}
                iconProps={{ style: { fontSize: "2rem" } }}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
