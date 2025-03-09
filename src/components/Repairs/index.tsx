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
import { LinkStyled } from '@components/Header/styled';
import { COLORS } from '@constants';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Skeleton, Table } from '@mui/material';
import { repairActions } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { deleteEquipments, deleteRepair, getEquipments, getRepairs } from '@thunks';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Roles } from '@@types';

import { LinkAct } from './styled';

const API_URL = import.meta.env.VITE_API_URL;

export const Repairs: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repairs, nextPage, prevPage, getRepairsThunk, page, size } = useSelector((state: RootState) => state.repairs);
  const { user } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState({
    id: 'asc',
    start: 'asc',
    end: 'asc',
    type: 'asc',
    fault: 'asc',
    emp: 'asc',
    eq: 'asc',
  });
  useEffect(() => {
    dispatch(getRepairs({ page, pageSize: size }));
  }, []);

  const isLoading = getRepairsThunk.status === 'pending';

  const handleLoadNext = () => {
    if (!nextPage) {
      return;
    }

    dispatch(getRepairs({ page: nextPage, pageSize: size }));
  };

  const handleLoadPrev = () => {
    if (!prevPage) {
      return;
    }

    dispatch(getRepairs({ page: prevPage, pageSize: size }));
  };

  const handleDelete = (id: number) => () => {
    const confirmed = window.confirm('Вы действительно хотите удалить запись?');

    if (!confirmed) {
      return;
    }

    dispatch(deleteRepair(id));
  };

  const handleIdSort = () => {
    dispatch(repairActions.setRepairs([...repairs].sort((a, b) => (orders.id === 'asc' ? b.id - a.id : a.id - b.id))));
    setOrders({ ...orders, id: orders.id === 'asc' ? 'desc' : 'asc' });
  };

  const handleStartSort = () => {
    dispatch(
      repairActions.setRepairs(
        [...repairs].sort((a, b) =>
          orders.start === 'asc'
            ? +new Date(b.startDate) - +new Date(a.startDate)
            : +new Date(a.startDate) - +new Date(b.startDate),
        ),
      ),
    );
    setOrders({ ...orders, start: orders.start === 'asc' ? 'desc' : 'end' });
  };

  const handleEndSort = () => {
    dispatch(
      repairActions.setRepairs(
        [...repairs].sort((a, b) =>
          orders.end === 'asc'
            ? +new Date(b.endDate || Date.now()) - +new Date(a.endDate || Date.now())
            : +new Date(a.endDate || Date.now()) - +new Date(b.endDate || Date.now()),
        ),
      ),
    );
    setOrders({ ...orders, end: orders.end === 'asc' ? 'desc' : 'end' });
  };

  const handleTypeSort = () => {
    dispatch(
      repairActions.setRepairs(
        [...repairs].sort((a, b) =>
          orders.type === 'asc' ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type),
        ),
      ),
    );
    setOrders({ ...orders, type: orders.type === 'asc' ? 'desc' : 'asc' });
  };

  const handleFaultSort = () => {
    dispatch(
      repairActions.setRepairs(
        [...repairs].sort((a, b) =>
          orders.fault === 'asc'
            ? b.detectedFault.localeCompare(a.detectedFault)
            : a.detectedFault.localeCompare(b.detectedFault),
        ),
      ),
    );
    setOrders({ ...orders, fault: orders.fault === 'asc' ? 'desc' : 'asc' });
  };

  const handleEmployeeSort = () => {
    dispatch(
      repairActions.setRepairs(
        [...repairs].sort((a, b) =>
          orders.emp === 'asc'
            ? b.employee.name.localeCompare(a.employee.name)
            : a.employee.name.localeCompare(b.employee.name),
        ),
      ),
    );
    setOrders({ ...orders, emp: orders.emp === 'asc' ? 'desc' : 'asc' });
  };

  const handleEqSort = () => {
    dispatch(
      repairActions.setRepairs(
        [...repairs].sort((a, b) =>
          orders.eq === 'asc'
            ? b.equipment.name.localeCompare(a.equipment.name)
            : a.equipment.name.localeCompare(b.equipment.name),
        ),
      ),
    );
    setOrders({ ...orders, eq: orders.eq === 'asc' ? 'desc' : 'asc' });
  };

  if (isLoading) {
    return (
      <div>
        <PaginationDiv>
          <ItemHeader>Акты ремонта</ItemHeader>

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
        <ItemHeader>Акты ремонта</ItemHeader>

        <LinkStyled to={'/repairs/create'}>Добавить</LinkStyled>

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
            <th onClick={handleStartSort}>Начало</th>
            <th onClick={handleEndSort}>Конец</th>
            <th onClick={handleTypeSort}>Тип</th>
            <th onClick={handleFaultSort}>Неисправность</th>
            <th onClick={handleEmployeeSort}>Сотрудник</th>
            <th onClick={handleEqSort}>Оборудование</th>
            <th>Акт</th>
            <th>Операция</th>
          </tr>
        </THead>
        <TBody>
          {repairs.map((rep) => (
            <tr key={rep.id}>
              <td>{rep.id}</td>
              <td>{rep.startDate}</td>
              <td>{rep.endDate ? rep.endDate : 'В процессе'}</td>
              <td>{rep.type}</td>
              <td>{rep.detectedFault}</td>
              <td>{`${rep.employee.name} ${rep.employee.surname}  ${rep.employee.middlename}`}</td>
              <td>{`${rep.equipment.name} ${rep.equipment.serialNumber}`}</td>
              <td>
                <LinkAct href={`${API_URL}/docs/repair-act/${rep.id}`}>Документ</LinkAct>
              </td>
              <td>
                {user && user.role === Roles.Admin && (
                  <>
                    <Link to={`/repairs/${rep.id}/edit`}>
                      <IconBtn icon={faPencil} />
                    </Link>
                    <IconBtn icon={faTrash} onClick={handleDelete(rep.id)} />
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
