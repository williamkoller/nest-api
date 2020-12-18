import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers()
    return users
  }

  @Query(() => User)
  async userId(@Args('id') id: string): Promise<User> {
    const userId = await this.userService.findUserById(id)
    return userId
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data)
    return user
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('data') data: UpdateUserInput): Promise<User> {
    const user = await this.userService.updateUser(id, data)
    return user
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const user = await this.userService.deleteUser(id)
    return user
  }
}
