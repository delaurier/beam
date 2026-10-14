"use client";

import type { ReactNode } from "react";
import ExButtonVariants from "./button/variants";
import ExButtonWithIcons from "./button/with-icons";
import ExButtonStates from "./button/states";
import ExButtonIconOnly from "./button/icon-only";
import ExButtonAsLink from "./button/as-link";
import ExButtonInContext from "./button/in-context";
import ExTextFieldStates from "./text-field/states";
import ExSelectBasic from "./select/basic";
import ExMenuBasic from "./menu/basic";
import ExCheckboxStates from "./checkbox/states";
import ExRadioGroup from "./radio/group";
import ExSwitchStates from "./switch/states";
import ExNavigationSidebar from "./navigation/sidebar";
import ExViewSwitchBasic from "./view-switch/basic";
import ExTabsBasic from "./tabs/basic";
import ExToggleGroupBasic from "./toggle-group/basic";
import ExAvatarBasic from "./avatar/basic";
import ExMeasuresAll from "./measures/all";
import ExTooltipBasic from "./tooltip/basic";
import ExDialogConfirm from "./dialog/confirm";
import ExToastBasic from "./toast/basic";
import ExAccordionBasic from "./accordion/basic";
import ExPopoverBasic from "./popover/basic";
import ExNumberFieldBasic from "./number-field/basic";
import ExComboboxBasic from "./combobox/basic";
import ExScrollAreaBasic from "./scroll-area/basic";
import ExMetricStripBasic from "./metric-strip/basic";
import ExTableSales from "./table/sales";
import ExTableWorstCase from "./table/worst-case";
import ExTableEmpty from "./table/empty";
import ExFiguresShareBar from "./figures/share-bar";
import ExFiguresRangeGauge from "./figures/range-gauge";
import ExCardsSummary from "./cards/summary";
import ExCardsAttention from "./cards/attention";
import ExTableGroups from "./table/groups";

export const EXAMPLES: Record<string, () => ReactNode> = {
  "button/variants": ExButtonVariants,
  "button/with-icons": ExButtonWithIcons,
  "button/states": ExButtonStates,
  "button/icon-only": ExButtonIconOnly,
  "button/as-link": ExButtonAsLink,
  "button/in-context": ExButtonInContext,
  "text-field/states": ExTextFieldStates,
  "select/basic": ExSelectBasic,
  "menu/basic": ExMenuBasic,
  "checkbox/states": ExCheckboxStates,
  "radio/group": ExRadioGroup,
  "switch/states": ExSwitchStates,
  "navigation/sidebar": ExNavigationSidebar,
  "view-switch/basic": ExViewSwitchBasic,
  "tabs/basic": ExTabsBasic,
  "toggle-group/basic": ExToggleGroupBasic,
  "avatar/basic": ExAvatarBasic,
  "measures/all": ExMeasuresAll,
  "tooltip/basic": ExTooltipBasic,
  "dialog/confirm": ExDialogConfirm,
  "toast/basic": ExToastBasic,
  "accordion/basic": ExAccordionBasic,
  "popover/basic": ExPopoverBasic,
  "number-field/basic": ExNumberFieldBasic,
  "combobox/basic": ExComboboxBasic,
  "scroll-area/basic": ExScrollAreaBasic,
  "metric-strip/basic": ExMetricStripBasic,
  "table/sales": ExTableSales,
  "table/worst-case": ExTableWorstCase,
  "table/empty": ExTableEmpty,
  "figures/share-bar": ExFiguresShareBar,
  "figures/range-gauge": ExFiguresRangeGauge,
  "cards/summary": ExCardsSummary,
  "cards/attention": ExCardsAttention,
  "table/groups": ExTableGroups,
};
