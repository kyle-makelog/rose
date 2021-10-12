import models from "@prisma/client";

export const person = {
  Person: {
    avatar(p: models.Person) {
      return p.avatarURL;
    },
  },
};
