import { getprojectsLoadedData, setAddKey, setAddProject } from '../../utils/apis';
import { setProjectsLoaded } from '../reducers/products';

export const getprojectsLoaded = () => async dispatch => {
  const res = await getprojectsLoadedData();
  console.log(res);
  dispatch(setProjectsLoaded(res.data));
};
export const AddProject = (data) => async dispatch => {
  const key_type = data.keys_information.key_type;
  const key_value = data.keys_information.key_value;
  const project_name = data.project_information.project_name;
  const project_description = data.project_information.project_description;

  // await setAddKey({
  //   name: `${project_name} - ${key_type}`,
  //   description: 'Quick key generated',
  //   organisation: key_type,
  //   key: key_value,
  // });

  await setAddProject({
    name: project_name,
    description: project_description,
    organisation: key_type,
    key: key_value,
  });

  dispatch(getprojectsLoaded());
};