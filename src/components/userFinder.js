import { useEffect } from "react";

const useUserFinder = (getIdTokenClaims, user, setUserId) => {
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Check if user is defined before accessing its properties
        if (user) {
          const idToken = await getIdTokenClaims();
          setUserId(idToken['https://example.com/userId']);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [getIdTokenClaims, user]);
};

export default useUserFinder;
