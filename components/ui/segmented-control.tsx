"use client";

import { tv } from "tailwind-variants";
import * as RadixTabs from "@radix-ui/react-tabs";
import type { ElementRef } from "react";
import { forwardRef } from "react";

/* ---------- Variants ---------- */

const segmentedControlVariants = tv({
  slots: {
    list: "inline-flex rounded-[9px] bg-zinc-100 p-[1px]",
    trigger:
      "data-[state=active]:shadow-button-secondary grid h-[34px] place-content-center rounded-lg px-3 pt-px text-sm font-medium text-zinc-500 transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=inactive]:hover:text-zinc-900",
  },
});

const { list, trigger } = segmentedControlVariants();

/* ---------- SegmentedControlRoot ---------- */

type SegmentedControlRootProps = RadixTabs.TabsProps;
const SegmentedControlRoot = RadixTabs.Tabs;

/* ---------- SegmentedControlList ---------- */
type SegmentedControlListProps = RadixTabs.TabsListProps;
const SegmentedControlList = forwardRef<
  ElementRef<typeof RadixTabs.List>,
  SegmentedControlListProps
>((props, ref) => {
  const { className, ...rest } = props;

  return <RadixTabs.List className={list({ className })} ref={ref} {...rest} />;
});

SegmentedControlList.displayName = "SegmentedControlList";

/* ---------- SegmentedControlTrigger ---------- */
type SegmentedControlTriggerProps = RadixTabs.TabsTriggerProps;
const SegmentedControlTrigger = forwardRef<
  ElementRef<typeof RadixTabs.Trigger>,
  SegmentedControlTriggerProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <RadixTabs.Trigger className={trigger({ className })} ref={ref} {...rest} />
  );
});

SegmentedControlTrigger.displayName = "SegmentedControlTrigger";

/* ---------- SegmentedControlContent ---------- */

type SegmentedControlContentProps = RadixTabs.TabsContentProps;
const SegmentedControlContent = RadixTabs.Content;

/* ---------- Exports ---------- */
export {
  SegmentedControlRoot as Root,
  SegmentedControlList as List,
  SegmentedControlTrigger as Trigger,
  SegmentedControlContent as Content,
  segmentedControlVariants as variants,
};

export type {
  SegmentedControlRootProps as RootProps,
  SegmentedControlListProps as ListProps,
  SegmentedControlTriggerProps as TriggerProps,
  SegmentedControlContentProps as ContentProps,
};
