"use client";

import { Form, Formik } from "formik";
import { omit } from "remeda";
import { useState } from "react";
import { Dialog } from "~/components/ui";
import { useSearchPageSearchParams } from "../../context";
import { parseFiltersValues, initialValues } from "../shared";
import { FiltersModalTrigger } from "./filters-modal-trigger";
import { FiltersModalDesktop } from "./filters-modal-desktop";
import { FiltersModalMobile } from "./filters-modal-mobile";

export function FiltersModal() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchPageSearchParams();

  const filters = omit(searchParams, ["page", "view", "item_location", "sort"]);

  const initial = {
    ...initialValues,
    ...filters,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initial}
      onSubmit={(values) => {
        const parsedFilters = parseFiltersValues(values);

        setSearchParams((prev) => ({
          ...prev,
          ...parsedFilters,
          page: 1,
        }));

        setOpen(false);
      }}
    >
      <Dialog.Root onOpenChange={setOpen} open={open}>
        <FiltersModalTrigger filters={filters} />
        <Form>
          <FiltersModalDesktop />
          <FiltersModalMobile />
        </Form>
      </Dialog.Root>
    </Formik>
  );
}
