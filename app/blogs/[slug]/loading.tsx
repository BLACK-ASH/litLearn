import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeIcon } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <main className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-4">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="hidden sm:block">
                Blog page
              </BreadcrumbPage>
              <BreadcrumbPage className="sm:hidden"></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Skeleton className="w-[100px] h-[25px] my-4 " />
      <Skeleton className="w-full h-[75px] my-8 " />

      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
      <div className="space-y-2 my-8">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      <div className="space-y-2 my-8">
        <Skeleton className="h-[40vh] w-[60vh] mx-auto" />
        <Skeleton className="h-8  w-[80vh] mx-auto" />
      </div>

      <Skeleton className="h-screen w-[80vh] mx-auto" />
    </main>
  );
}
