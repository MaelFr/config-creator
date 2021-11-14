import * as clustersFns from "../../clusters";

function useConfig(discovery: Discovery) {
  const clusters: string[] = [];

  let ModelIdentifier: string =
    (discovery.endPoints["01"]?.servClusters["0000"]?.attributes["0005"]
      ?.value as string) || "unknownModel";
  let ManufacturerName: string =
    (discovery.endPoints["01"]?.servClusters["0000"]?.attributes["0004"]
      ?.value as string) || "unknownManufacturer";

  const commands: Commands = {};

  for (const epId in discovery.endPoints) {
    const ep = discovery.endPoints[epId];
    for (const clusterId in ep.servClusters) {
      // ignore cluster already parsed previously
      if (clusters.includes(clusterId)) continue;

      const cluster = ep.servClusters[clusterId];

      switch (clusterId) {
        case "0000":
          clustersFns.c0000(commands, cluster);
          break;
        case "0006":
          clustersFns.c0006(commands, cluster);
          break;
        case "0201":
          clustersFns.c0201(commands, cluster);
          break;
        default:
          console.warn(
            `Not yet ready or Manufacturer Specific cluster: ${clusterId}`
          );
          break;
      }

      clusters.push(clusterId);
    }
  }

  const config: Config = {
    [ModelIdentifier]: {
      type: `${ManufacturerName} ${ModelIdentifier}`,
      manufacturer: ManufacturerName,
      model: ModelIdentifier,
      timeout: "60",
      category: {},
      configuration: {
        mainEP: "01",
      },
      commands,
    },
  };

  return config;
}

export default useConfig;
