"use client";

import BuyCreditsModal from "./BuyCreditsModal";
import OutOfCreditsModal from "./OutOfCreditsModal";

export default function ModalProvider() {
  return (
    <>
      <OutOfCreditsModal />
      <BuyCreditsModal />
    </>
  );
}
