import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findUserById(id: string): Promise<User> {
    const userId = await this.userRepository.findOne(id)

    if (!userId) {
      throw new NotFoundException('User not found.')
    }

    return userId
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException('User not found.')
    }
    return user
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const findUser = await this.findUserByEmail(data.email)
    if (findUser) {
      throw new BadRequestException('User already registered with this email')
    }
    const user = this.userRepository.create(data)
    const userSaved = await this.userRepository.save(user)
    if (!userSaved) {
      throw new InternalServerErrorException('Error creating a user')
    }
    return userSaved
  }

  async updateUser(data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(data.id)
    return this.userRepository.save({ ...user, ...data })
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id)
    const userDeleted = await this.userRepository.remove(user)
    return userDeleted ? true : false
  }
}
