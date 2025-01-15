import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [children, setChildren] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          router.push("/auth/login");
        }

        const data = await res.json();
        if (res.ok) {
          console.log("User data fetched:", data.user);
          setUser(data.user);
          setRole(data.user.role);
          setName(data.user.name);

          // Jika role adalah PARENT, ambil data anak
          if (data.user.role === "PARENT") {
            const childRes = await fetch("/api/admin/child", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const childData = await childRes.json();
            if (childRes.ok) {
              const filteredChildren = childData?.children?.filter((child) => child.parent.userId === data.user.id);
              console.log("Children data fetched for parent:", filteredChildren);
              setChildren(filteredChildren);
            } else {
              console.error("Failed to fetch children:", childData.message);
            }
          }
        }
      } catch (error) {
        router.push("/auth/login");
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // console.log("useUser state:", { user, loading, name, children, role });

  return { user, loading, name, children, role };
}
