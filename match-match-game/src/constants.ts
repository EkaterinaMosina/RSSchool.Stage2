import bird from '../img/bird.png';
import birdhouse from '../img/birdhouse.png';
import cat1 from '../img/cat1.png';
import cat2 from '../img/cat2.png';
import chameleon from '../img/chameleon.png';
import chicken from '../img/chicken.png';
import dog from '../img/dog.png';
import doghouse from '../img/doghouse.png';
import dogtreat from '../img/dogtreat.png';
import fish from '../img/fish.png';
import hamster from '../img/hamster.png';
import hedgehog from '../img/hedgehog.png';
import pawprint from '../img/pawprint.png';
import pets from '../img/pets.png';
import rabbit from '../img/rabbit.png';
import snake from '../img/snake.png';
import turtle from '../img/turtle.png';
import rat from '../img/rat.png';

import beachball from '../img/beachball.png';
import beachchair from '../img/beachchair.png';
import bucket from '../img/bucket.png';
import cap from '../img/cap.png';
import cocktail from '../img/cocktail.png';
import cruise from '../img/cruise.png';
import fan from '../img/fan.png';
import flipflops from '../img/flipflops.png';
import hibiscus from '../img/hibiscus.png';
import icecream from '../img/icecream.png';
import leaf from '../img/leaf.png';
import lifebuoy from '../img/lifebuoy.png';
import pamela from '../img/pamela.png';
import sailboat from '../img/sailboat.png';
import soda from '../img/soda.png';
import sunglasses from '../img/sunglasses.png';
import swimsuit from '../img/swimsuit.png';
import watermelon from '../img/watermelon.png';

export default class Constants {
  public readonly VALID = 'valid';

  public readonly INVALID = 'invalid';

  public readonly ERROR = 'error-active';

  public readonly NO_ERROR = 'error';

  public readonly RESULT_DELAY: number = 1;

  public readonly ERROR_MESSAGE_EMPTY_INPUT = 'Поле не может быть пустым';

  public readonly ERROR_MESSAGE_LONG_INPUT = 'Количество символов не должно превышать 30';

  public readonly ERROR_MESSAGE_SYMBOLS = 'Поле не может содержать служебные символы';

  public readonly ERROR_MESSAGE_NUMBERS = 'Поле не может coстоять только из цифр';

  public readonly ERROR_MESSAGE_INVALID_EMAIL = 'Вы ввели некорректный email';

  public readonly FORBIDDEN_SYMBOLS = [
    '~', '!', '@', '#', '$', '%', '*', '(', ')', '_', '—', '+', '=',
    '|', ':', ';', ',', '"', "'", '`', '<', '>', ',', '.', '?', '/', '^',
  ];

  public readonly FORBIDDEN = 'forbidden';

  public readonly ALLOWED = 'allowed';

  public readonly FLIP_CLASS = 'flipped';

  public readonly CORRECT = 'correct';

  public readonly INCORRECT = 'incorrect';

  public readonly FIRST_NAME_LABEL =
  '<label class="form-label" for="first-name">First Name</label>';

  public readonly LAST_NAME_LABEL =
  '<label class="form-label" for="last-name">Last Name</label>';

  public readonly EMAIL_LABEL = '<label class="form-label" for="email">E-mail</label>';

  public readonly FIRST_NAME = 'first-name';

  public readonly LAST_NAME = 'last-name';

  public readonly EMAIL = 'email';

  public readonly TYPE_TEXT = 'text';

  public readonly INPUT_TAG = 'input';

  public readonly KEY_FIRST_NAME = 'userFirstName';

  public readonly KEY_LAST_NAME = 'userLastName';

  public readonly KEY_EMAIL = 'userEmail';

  public readonly PETS_IMAGES: string[] = [
    bird,
    birdhouse,
    cat1,
    cat2,
    chameleon,
    chicken,
    dog,
    doghouse,
    dogtreat,
    fish,
    hamster,
    hedgehog,
    pawprint,
    pets,
    rabbit,
    snake,
    turtle,
    rat,
  ];

  public readonly SUMMER_IMAGES: string[] = [
    beachball,
    beachchair,
    bucket,
    cap,
    cocktail,
    cruise,
    fan,
    flipflops,
    hibiscus,
    icecream,
    leaf,
    lifebuoy,
    pamela,
    sailboat,
    soda,
    sunglasses,
    swimsuit,
    watermelon,
  ];

  public readonly SIMPLE_GAME = 'simple-game';

  public readonly HARD_GAME = 'hard-game';

  public readonly SHOW_TIME = 30;
}

