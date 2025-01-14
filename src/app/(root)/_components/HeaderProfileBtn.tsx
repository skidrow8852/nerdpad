"use client";
import LoginButton from "@/components/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function HeaderProfileBtn() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSnippetsRoute = pathname === "/snippets";

  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        {!isSnippetsRoute || !isMobile ? <LoginButton /> : null}
      </SignedOut>
    </>
  );
}

export default HeaderProfileBtn;
