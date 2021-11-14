function addCommand(
  commands: Commands,
  cmdName: string,
  cmdUse: CommandName,
  options?: Omit<Command, "use">
) {
  if (commands[cmdName]) {
    throw Error(
      `${cmdName} already exists with and use command ${commands[cmdName].use}`
    );
  }

  commands[cmdName] = {
    use: cmdUse,
    ...options,
  };
}

export function c0000(commands: Commands, cluster: Cluster) {
  if (cluster.attributes["4000"]) {
    addCommand(commands, "SWBuildId", "zb-0000-SWBuildID");
    addCommand(commands, "Get-SWBuildID", "zbReadAttribute", {
      params: "clustId=0000&attrId=4000",
    });
  }
}

export function c0001(commands: Commands, cluster: Cluster) {
  // TODO
}

export function c0002(commands: Commands, cluster: Cluster) {
  // TODO
}

export function c0003(commands: Commands, cluster: Cluster) {
  // TODO
}

export function c0004(commands: Commands, cluster: Cluster) {
  addCommand(commands, "Groups", "Group-Membership");
}

export function c0005(commands: Commands, cluster: Cluster) {
  // TODO
}

export function c0006(commands: Commands, cluster: Cluster) {
  addCommand(commands, "Etat", "etat");
  addCommand(commands, "getEtat", "getEtat");
  addCommand(commands, "On", "zbCmd-0006-On");
  addCommand(commands, "Off", "zbCmd-0006-Off");
  addCommand(commands, "Toggle", "zbCmd-0006-Toggle");
}

export function c0201(commands: Commands, cluster: Cluster) {
  addCommand(commands, "Local Temperature", "zb-0201-LocalTemperature", {
    isVisible: 1,
  });
  addCommand(commands, "Occupancy", "zb-0201-Occupancy", { isVisible: 1 });
  addCommand(commands, "System Mode", "zb-0201-SystemMode", { isVisible: 1 });
  addCommand(commands, "Bind-0201-ToZigate", "bindToZigate", {
    params: "clustId=0201",
    execAtCreation: "Yes",
  });
}
