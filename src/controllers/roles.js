const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = {
  sales: ac.grant("sales").readAny("orders").readAny("pickups").readAny("stock"),
  finance: ac.grant("finance").readAny("orders").readAny("payments").readAny("pickups").readAny("stock"),
  director: ac.grant("director").readAny("orders").readAny("payments").readAny("pickups").readAny("vendors").readAny("stock"),
  logistics: ac.grant("logistics").readAny("orders").readAny("vendors"),
  admin: ac.grant("admin").readAny("orders").readAny("payments").readAny("pickups").readAny("vendors").readAny("stock").updateAny().deleteAny(),
  can: function(role) {
    return ac.can(role);
  }
};

exports.roles = roles;
