import Image from "next/image";

export default function Home() {
  const pages = [
    {
      key: "task1",
      title: "Generate N even numbers",
      href: "/task1",
    },
    {
      key: "task2",
      title: "Multiply two matrices",
      href: "/task2",
    },
    {
      key: "task3",
      title: "User login",
      href: "/task3",
    },
    {
      key: "task4",
      title: "Display Nth largest number",
      href: "/task4",
    },
    {
      key: "task5",
      title: "Generate N even numbers",
      href: "/task1",
    },
  ];
  return (
    <div className="grid grid-cols-2 grid-rows-3 items-center justify-center gap-5 p-5">
      {pages.map((page) => {
        return (
          <a
            key={page.key}
            href={page.href}
            className="last:col-span-2 p-5 bg-black flex items-center justify-center min-w-32 h-32 rounded-md"
          >
            <span className="text-white text-center text-lg">{page.title}</span>
          </a>
        );
      })}
    </div>
  );
}
