import { Test, TestingModule } from '@nestjs/testing';
import { describe, mock } from 'node:test';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: Partial<Record<keyof Repository<User>, jest.Mock>>;
  let customerServiceMock: Partial<Record<keyof CustomersService, jest.Mock>>;

  beforeEach(async () => {
    repositoryMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    customerServiceMock = {
      findOne: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers:[UsersService, {
        provide: getRepositoryToken(User),
        useValue: repositoryMock,
      },
      {
        provide: CustomersService,
        useValue: customerServiceMock
      },

      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('findOne', () => {
    it('should return a user when found', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        createAt: new Date(),
        updateAt: new Date(),
        customer: null,
      };
      repositoryMock.findOne!.mockResolvedValue(mockUser);

      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      repositoryMock.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        customerId: 1,
      };
      const mockUser: User = {
        id: 1,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role,
        createAt: new Date(),
        updateAt: new Date(),
        customer: null,
      };
      const mockCustomer = {
        id: 1,
        name: 'Customer Name',
      };
      repositoryMock.create!.mockReturnValue(mockUser)
      customerServiceMock.findOne!.mockResolvedValue(mockCustomer)
      repositoryMock.save!.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);
      expect(repositoryMock.create).toHaveBeenCalledWith(createUserDto)
      expect(customerServiceMock.findOne).toHaveBeenCalledWith(createUserDto.customerId)
      expect(mockUser.customer).toEqual(mockCustomer);
      expect(repositoryMock.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
    it('should create and save a new user without customer', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        customerId: undefined,
      } as any
      const mockUser: User = {
        id: 1,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role,
        createAt: new Date(),
        updateAt: new Date(),
        customer: null,
      };

      repositoryMock.create!.mockReturnValue(mockUser);
      repositoryMock.save!.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(repositoryMock.create).toHaveBeenCalledWith(createUserDto);
      expect(customerServiceMock.findOne).not.toHaveBeenCalled();
      expect(repositoryMock.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    })

  })
});
