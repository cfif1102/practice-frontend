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
import { employeesActions } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { deleteEmployee, deleteEquipments, getEmployees, getEquipments } from '@thunks';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Roles } from '@@types';

export const Employees: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, nextPage, prevPage, getEmployeesThunk, page, size } = useSelector(
    (state: RootState) => state.employees,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState({
    name: 'asc',
    surname: 'asc',
    middlename: 'asc',
    id: 'asc',
  });

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

  const handleIdSort = () => {
    dispatch(
      employeesActions.setEmployees([...employees].sort((a, b) => (orders.id === 'asc' ? b.id - a.id : a.id - b.id))),
    );

    setOrders({ ...orders, id: orders.id === 'asc' ? 'desc' : 'asc' });
  };

  const handleNameSort = () => {
    dispatch(
      employeesActions.setEmployees(
        [...employees].sort((a, b) =>
          orders.name === 'asc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
        ),
      ),
    );
    setOrders({ ...orders, name: orders.name === 'asc' ? 'desc' : 'asc' });
  };

  const handleSurnameSort = () => {
    dispatch(
      employeesActions.setEmployees(
        [...employees].sort((a, b) =>
          orders.surname === 'asc' ? b.surname.localeCompare(a.surname) : a.surname.localeCompare(b.surname),
        ),
      ),
    );
    setOrders({ ...orders, surname: orders.surname === 'asc' ? 'desc' : 'asc' });
  };

  const handleMiddlenameSort = () => {
    dispatch(
      employeesActions.setEmployees(
        [...employees].sort((a, b) =>
          orders.middlename === 'asc'
            ? b.middlename.localeCompare(a.middlename)
            : a.middlename.localeCompare(b.middlename),
        ),
      ),
    );
    setOrders({ ...orders, middlename: orders.middlename === 'asc' ? 'desc' : 'asc' });
  };

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
            <th onClick={handleIdSort}>ID</th>
            <th onClick={handleNameSort}>Имя</th>
            <th onClick={handleSurnameSort}>Фамилия</th>
            <th onClick={handleMiddlenameSort}>Отчество</th>
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
