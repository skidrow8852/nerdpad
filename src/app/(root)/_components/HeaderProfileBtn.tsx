"use client";
import LoginButton from "@/components/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function HeaderProfileBtn() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen is mobile
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSnippetsRoute = router.pathname === "/snippets";

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
        {/* Hide LoginButton if on snippets route and on mobile */}
        {!isSnippetsRoute || !isMobile ? <LoginButton /> : null}
      </SignedOut>
    </>
  );
}

export default HeaderProfileBtn;
