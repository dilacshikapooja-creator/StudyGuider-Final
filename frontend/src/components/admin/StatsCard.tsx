import styles from "./StatsCard.module.scss";

type StatsCardProps = {
  title: string;
  value: string;
  subtext: string;
};

export default function StatsCard({ title, value, subtext }: StatsCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <h3 className={styles.value}>{value}</h3>
      <span className={styles.subtext}>{subtext}</span>
    </div>
  );
}