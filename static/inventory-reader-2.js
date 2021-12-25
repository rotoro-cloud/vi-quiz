class InventoryParser {
  constructor(file_contents) {
    this._file_contents = file_contents;
    this._data = {_meta: {hostvars: {}}}
  };

  get file_contents() {
    return this._file_contents
  };

  get data() {
    return this._data
  };

  get ignored_variables() {
    return ["ansible_ssh_user"]
  };

  get file_lines() {
    return this.file_contents.split("\n")
  };

  parse() {
    let current_section = null;

    for (let line of this.file_lines) {
      if (!line) continue;
      let parts = line.split(" ");
      if (parts.length == 0) continue;
      if (parts[0][0] == "#") continue;
      if (parts[0][0] == "/") continue;

      if (parts[0][0] == "[") {
        current_section = parts[0].replace(/\[/g, "").replace(/\]/g, "");

        if (this.data[current_section] == null && !current_section.includes(":vars")) {
          this.data[current_section] = []
        };

        continue
      };

      if (current_section != null && current_section.includes(":vars")) {
        parts = line.split("=");
        let key = parts[0];
        let value = parts[1];
        let col = current_section.split(":");
        col.pop;
        let group = col.join(":");
        this.fill_hosts_with_group_var(group, key, value)
      } else {
        
        let hostname = parts.shift();
        this.ensure_host_variables(hostname);
        let d = {};

        while (parts.length > 0) {
          let part = parts.shift();
          let words = part.split("=");

          if (!this.ignored_variables.includes(words[0])) {
            d[words[0]] = words[words.length - 1]
          }
        };

        if (current_section) this.data[current_section].push(hostname);
        Object.keys(d).forEach((k) => this.data["_meta"].hostvars[hostname][k] = d[k])
      }
    };

    return this.data
  };

  ensure_host_variables(hostname) {
    if (this.data["_meta"].hostvars[hostname] == null) {
      this.data["_meta"].hostvars[hostname] = {}
    }
  };

  fill_hosts_with_group_var(group, key, value) {
    if (this.ignored_variables.includes(key)) return;
    if (value.includes("'") || value.includes("\"")) value = eval(value);

    for (let hostname of this.data[group]) {
      this.ensure_host_variables(hostname);
      this.data["_meta"].hostvars[hostname][key] = value
    }
  }
}
