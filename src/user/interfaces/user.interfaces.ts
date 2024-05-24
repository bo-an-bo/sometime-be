export interface UserInterface extends Document {
  kakaoId: number;
  name: string;
  email: string;
  auth: {
    owner: string[];
    editor: string[];
    viewer: string[];
  };
}
