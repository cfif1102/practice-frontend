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
import { deleteEquipments, deleteRepair, getEquipments, getRepairs } from '@thunks';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Roles } from '@@types';

import { LinkAct } from './styled';

const API_URL = import.meta.env.VITE_API_URL;

export const Repairs: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repairs, nextPage, prevPage, getRepairsThunk, page, size } = useSelector((state: RootState) => state.repairs);
  const { user } = useSelector((state: RootState) => state.auth);

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
            <th>Начало</th>
            <th>Конец</th>
            <th>Тип</th>
            <th>Неисправность</th>
            <th>Сотрудник</th>
            <th>Оборудование</th>
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
