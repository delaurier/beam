import { DollarSign, LayoutDashboard, MapPin, Sprout } from "lucide-react";
import { NavGroup, NavLink, NavList } from "@/components/ui/navigation";

// One group open, with the current page marked. Groups that are closed show only their heading.
export default function NavigationSidebar() {
  return (
    <div className="w-56">
      <NavList label="Example">
        <NavLink href="#" icon={LayoutDashboard}>
          Overview
        </NavLink>
        <NavGroup icon={Sprout} label="Crops" open>
          <NavLink href="#" nested current>
            Corn
          </NavLink>
          <NavLink href="#" nested>
            Soybeans
          </NavLink>
        </NavGroup>
        <NavGroup icon={MapPin} label="Land" />
        <NavGroup icon={DollarSign} label="Finance" />
      </NavList>
    </div>
  );
}
