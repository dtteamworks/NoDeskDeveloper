"use client";

import { useRouter } from "next/navigation";

const BookingsPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen w-full grid place-items-center">
        <button onClick={() => router.push("/admin/bookings/dev-bookings")}>
          Dev Bookings
        </button>
      </div>
    </>
  );
};

export default BookingsPage;
