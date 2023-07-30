import { BaseAction } from './baseAction';
import { ActionType } from '.';

export class SleepAction extends BaseAction {
  constructor() {
    super(ActionType.SLEEP);
  }
}
