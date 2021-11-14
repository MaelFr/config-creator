import styles from "./Config.module.css";
import useConfig from "./useConfig";

const Config: React.FC<{ discovery: Discovery }> = ({ discovery }) => {
  const config = useConfig(discovery);

  return (
    <div>
      <p>EPs: {discovery.epCount}</p>
      <p>Power source: {discovery.powerSource}</p>
      <div className={styles.displayWrapper}>
        <pre>{JSON.stringify(discovery, undefined, 2)}</pre>
        <pre>{JSON.stringify(config, undefined, 2)}</pre>
      </div>
    </div>
  );
};

export default Config;
