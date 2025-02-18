import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { Constants } from '../../constants/constants';
import { CurrentUser } from './current-user.decorator';

// eslint-disable-next-line
function getParamDecoratorFactory(decorator: Function) {
  class Test {
    // eslint-disable-next-line
    public test(@decorator() value) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
describe('UserDecorator', () => {
  let paramDecorator: ParameterDecorator;
  beforeEach(() => {
    paramDecorator = CurrentUser;
  });

  it('should be defined', () => {
    expect(paramDecorator).toBeDefined();
  });

  it('check valid', () => {
    const value = {
      id: 1,
      username: 'test',
    };
    const mockupCtx = {
      switchToHttp: () => {
        return {
          getRequest: () => {
            return { [Constants.user]: value };
          },
        };
      },
    };
    const factory = getParamDecoratorFactory(CurrentUser);
    expect(factory(null, mockupCtx)).toEqual(value);
  });
});
