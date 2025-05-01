import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const { setCurrency } = useContext(TransactionContext);
  const handleChange = (value) => {
    setCurrency(value);
  };

  return (
    <div className="flex justify-end items-center mb-2">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="₴ UAH" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="UAH">₴ UAH</SelectItem>
          <SelectItem value="USD">$ USD</SelectItem>
          <SelectItem value="EUR">€ EUR</SelectItem>
        </SelectContent>
      </Select>
      {theme === "light" ? (
        <Sun
          onClick={() => setTheme("dark")}
          className="h-[1.2rem] w-[1.2rem] cursor-pointer ml-2"
        />
      ) : (
        <Moon
          onClick={() => setTheme("light")}
          className="h-[1.2rem] w-[1.2rem] cursor-pointer ml-2"
        />
      )}
    </div>
  );
}
