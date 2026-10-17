import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { SECTIONS } from "../data/sections";
import { projectSlug } from "../data/projectSlug";
import projectsData from "../data/projects.json";

const PROJECTS = Object.values(projectsData.categories)
  .flat()
  .filter((project) => !project.hidden);

const LINKS = [
  { label: "GitHub Profile", url: "https://github.com/RakhaYandra" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/rakhaputrapebriyandra",
  },
  { label: "Email", url: "mailto:rakhaputrapebriyandra272@gmail.com" },
];

export const CommandPalette = ({ open, onOpenChange }) => {
  const go = (getElement) => {
    onOpenChange(false);
    setTimeout(() => getElement()?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search sections, projects, links…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {SECTIONS.map((section) => (
            <CommandItem
              key={section.id}
              value={`section ${section.label}`}
              onSelect={() => go(() => document.getElementById(section.id))}
            >
              <span aria-hidden="true">#</span>
              {section.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {PROJECTS.map((project) => (
            <CommandItem
              key={project.title}
              value={`project ${project.title}`}
              onSelect={() =>
                go(
                  () =>
                    (projectSlug(project.title) &&
                      document.getElementById(projectSlug(project.title))) ||
                    document.getElementById("projects")
                )
              }
            >
              <span aria-hidden="true">▸</span>
              {project.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {LINKS.map((link) => (
            <CommandItem
              key={link.url}
              value={`link ${link.label}`}
              onSelect={() => {
                onOpenChange(false);
                setTimeout(() => window.open(link.url, "_blank", "noopener"), 150);
              }}
            >
              <span aria-hidden="true">↗</span>
              {link.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
