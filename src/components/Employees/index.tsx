import {
  IconBtn,
  ItemHeader,
  LoadBtn,
  NavDiv,
  PageNumber,
  PaginationDiv,
  TableLoadingDiv,
  TBody,
  THead,
} from '@components/Equipments/styled';
import { COLORS } from '@constants';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Skeleton, Table } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { deleteEmployee, deleteEquipments, getEmployees, getEquipments } from '@thunks';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Roles } from '@@types';

export const Employees: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, nextPage, prevPage, getEmployeesThunk, page, size } = useSelector(
    (state: RootState) => state.employees,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getEmployees({ page, pageSize: size }));
  }, []);

  const isLoading = getEmployeesThunk.status === 'pending';

  const handleLoadNext = () => {
    if (!nextPage) {
      return;
    }

    dispatch(getEmployees({ page: nextPage, pageSize: size }));
  };

  const handleLoadPrev = () => {
    if (!prevPage) {
      return;
    }

    dispatch(getEmployees({ page: prevPage, pageSize: size }));
  };

  const handleDelete = (id: number) => () => {
    const confirmed = window.confirm('Вы действительно хотите удалить запись?');

    if (!confirmed) {
      return;
    }

    dispatch(deleteEmployee(id));
  };

  if (isLoading) {
    return (
      <div>
        <PaginationDiv>
          <ItemHeader>Сотрудники</ItemHeader>

          <NavDiv>
            <Skeleton width="200px" height="30px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
          </NavDiv>
        </PaginationDiv>

        <TableLoadingDiv>
          <Skeleton width="100%" height="70vh" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
        </TableLoadingDiv>
      </div>
    );
  }

  return (
    <>
      <PaginationDiv>
        <ItemHeader>Сотрудники</ItemHeader>

        <NavDiv>
          {prevPage && <LoadBtn onClick={handleLoadPrev}>Пред.</LoadBtn>}
          <PageNumber>Страница: {page}</PageNumber>
          {nextPage && <LoadBtn onClick={handleLoadNext}>След.</LoadBtn>}
        </NavDiv>
      </PaginationDiv>
      <Table border={1}>
        <THead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Операция</th>
          </tr>
        </THead>
        <TBody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.surname}</td>
              <td>{emp.middlename}</td>
              <td>
                {user && user.role === Roles.Admin && (
                  <>
                    <Link to={`/employees/${emp.id}/edit`}>
                      <IconBtn icon={faPencil} />
                    </Link>
                    <IconBtn icon={faTrash} onClick={handleDelete(emp.id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </TBody>
      </Table>
    </>
  );
};
