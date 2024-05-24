export class User {
  id: string;
  kakaoId: number;
  name: string;
  email: string;
  auth: {
    owner: string[];
    editor: string[];
    viewer: string[];
  };
}
