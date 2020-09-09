import IComponents from './IComponent';
import {SubBody} from './CompoundStaticBody'

export default class CompoundStaticBodyMember implements IComponents {
  public subbody?: SubBody;
}