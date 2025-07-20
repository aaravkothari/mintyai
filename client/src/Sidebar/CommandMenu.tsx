import { Command } from "cmdk";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiEye, FiLink, FiLogOut, FiPhone, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export const CommandMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => {e.stopPropagation(); setOpen(false)}}
        className="bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12"
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="Search..."
          className="relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none"
        />
        <Command.List className="p-3">
          <Command.Empty>
            No results found for{" "}
            <span className="text-violet-500">"{value}"</span>
          </Command.Empty>

          <Command.Group heading="Transactions" className="text-sm mb-3 text-stone-400">
          <Link to="/transactions">
              <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                <FiPlus />
                Transactions List
              </Command.Item>
            </Link>
            <Link to="/transactions/addnewtransaction">
              <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                <FiEye />
                Add Transaction
              </Command.Item>
          </Link>
          </Command.Group>

          <Command.Group heading="Reports" className="text-sm mb-3 text-stone-400">
            <Link to="/reports">
              <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                <FiEye />
                Reports
              </Command.Item>
            </Link>
          </Command.Group>

          {value && (
            <>
              <Command.Group
                heading="Instructions"
                className="text-sm text-stone-400 mb-3"
              >
                <Link to="/instructions#transactions-features">
                  <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                    <FiLink />
                    Instructions
                  </Command.Item>
                </Link>
                
              </Command.Group>

              <Command.Group heading="Dashboard" className="text-sm text-stone-400 mb-3">
                <Link to="/dashboard">
                  <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                    <FiEye />
                    Dashboard
                  </Command.Item>
                </Link>
              </Command.Group>

              <Command.Group heading="Student Mastery" className="text-sm text-stone-400 mb-3">
                <Link to="/student-mastery">
                  <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                    <FiEye />
                    Student Mastery
                  </Command.Item>
                </Link>
              </Command.Group>
            </>
          )}

          
          <Command.Item>
            <Link to="/mintyai" className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2">
              <FiLogOut />
              Help from MintyAI
            </Link>
          </Command.Item>
         
        </Command.List>
      </div>
    </Command.Dialog>
  );
};