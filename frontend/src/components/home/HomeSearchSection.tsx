import { useSearchServicesQuery } from "@/features/search/searchApi";
import useDebounce from "@/hooks/useDebounce";
import { skipToken } from "@reduxjs/toolkit/query";
import { AutoComplete, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export type ISearchSuggestion =
  | {
      type: "subCategory";
      text: string;
      slug: string;
    }
  | {
      type: "gig";
      text: string;
      gigId: string;
    };

type ISearchOption = ISearchSuggestion & {
  value: string;
  label: string;
};

function HeroSearchSection() {
  const { Search } = Input;

  const items = [
    "AC Repair",
    "Solar Installation",
    "Home Cleaning",
  ];

  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchValue, 500);

  const { data } = useSearchServicesQuery(
    debouncedValue.trim().length >= 2
      ? debouncedValue.trim()
      : skipToken
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [items.length]);

  const suggestions: ISearchSuggestion[] = data?.data ?? [];

  const options: ISearchOption[] =
    searchValue.trim().length >= 2
      ? suggestions.map((suggestion) => ({
          ...suggestion,
          value: suggestion.text,
          label: suggestion.text,
        }))
      : [];

  const handleSelect = (
    _: string,
    option: ISearchOption
  ) => {
    setSearchValue(option.text);

    // if (option.type === "subCategory") {
    //   navigate(`/giglistings/${option.slug}`);
    //   return;
    // }

    // if (option.type === "gig") {
    //   navigate(`/search/${option.gigId}`);
    // }
  };

  const handleSearch = (value: string) => {
    const query = value.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div id="search-provider" className="h-40">
      {/* Heading */}
      <div className="mt-10 text-center text-2xl font-bold text-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>

        <h2>Made easy</h2>
      </div>

      {/* Search */}
      <div className="mx-auto mt-8 max-w-xl px-4">
        <AutoComplete
          value={searchValue}
          options={options}
          onChange={(value) => {
            setSearchValue(value);
          }}
          onSelect={handleSelect}
          style={{ width: "100%" }}
        >
          <Search
          maxLength={20}
            placeholder="Search services"
            size="large"
            allowClear
            onSearch={handleSearch}
          />
        </AutoComplete>
      </div>
    </div>
  );
}

export default HeroSearchSection;