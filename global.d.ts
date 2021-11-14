interface Attribute {
  dataType: string;
  access: string;
  value: string | number;
}

interface Attributes {
  [attributeId: string]: Attribute;
}

interface Cluster {
  attributes: Attributes;
  commandsReceived: string[];
}

interface Clusters {
  [clusterId: string]: Cluster;
}

interface EndPoint {
  servClusters: Clusters;
  cliClusters: Clusters;
}

interface EndPoints {
  [ep: string]: EndPoint;
}

interface Discovery {
  epCount: number;
  endPoints: EndPoints;
  powerSource: string;
}

type Category =
  | "light"
  | "heating"
  | "security"
  | "energy"
  | "automatism"
  | "multimedia"
  | "default";

interface Commands {
  [commandName: string]: {
    use: string;
    params?: string;
    execAtCreation?: boolean;
    isHistorized?: boolean;
  };
}

interface Config {
  [modelIdentifier: string]: {
    type: string;
    manufacturer: string;
    model: string;
    timeout?: string;
    comment?: string;
    category: Optional<Record<Category, "1">>;
    configuration: {
      icon?: string;
      mainEP: string;
      paramType?: string;
      batteryType?: string;
      paramBatterie?: string;
      lastCommunicationTimeOut?: number;
      GroupeEPx?: any;
    };
    commands: Commands;
  };
}
