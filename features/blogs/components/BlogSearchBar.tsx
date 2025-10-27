"use client";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const BlogSearchBar = () => {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (slug !== "") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("slug", slug);
      router.push(`/blogs/?${params.toString()}`);
    } else {
      router.push(`/blogs`);
    }
  };

  return (
    <form
      onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
      className="w-full my-4 p-2 md:w-3/5 "
      onSubmit={handleSearch}
    >
      <InputGroup className="border-primary">
        <InputGroupInput
          onChange={(e) => {
            setSlug(e.target.value);
          }}
          placeholder="Type to search..."
        />
        <span className="sr-only">Search Bar</span>
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" variant="ghost">
            <SearchIcon className="size-4 text-primary" />
            <span className="sr-only">Search</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default BlogSearchBar;
