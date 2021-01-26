import { User } from '../../user/user.entity';

export default class TestUtil {
  static giveAMeAValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'William Koller';
    user.id = '1';
    return user;
  }
}
