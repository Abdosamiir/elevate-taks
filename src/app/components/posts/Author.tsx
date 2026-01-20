import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import type { AuthorProps } from "@/app/schema";

const Author = ({ value, onValueChange }: AuthorProps) => {
  return (
    <Field orientation="horizontal" className="w-fit justify-end">
      <FieldLabel
        htmlFor="small-form-role"
        className="flex-none hidden md:flex"
      >
        Author :
      </FieldLabel>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id="small-form-role"
          className="bg-white md:w-36 text-black!"
        >
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">Developer</SelectItem>
            <SelectItem value="2">Designer</SelectItem>
            <SelectItem value="3">Manager</SelectItem>
            <SelectItem value="4">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};

export default Author;
