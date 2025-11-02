"use client"

import HeaderLeft from "./headerLeft"
import HeaderRight from "./headerRight"

export default function Header() {
  return (
    <div className="mx-3 flex items-center justify-between py-4">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}

