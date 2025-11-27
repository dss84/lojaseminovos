import React, { useState } from 'react';
import { AUTHORIZED_USERS, AuthorizedUser } from '../config/authorizedUsers';

interface UserManagementProps {
  onClose: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onClose }) => {
  const [users, setUsers] = useState<AuthorizedUser[]>([...AUTHORIZED_USERS]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddUser = () => {
    if (!formData.email || !formData.password || !formData.name) {
      showMessage('error', 'Preencha todos os campos');
      return;
    }

    if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
      showMessage('error', 'Este email já está cadastrado');
      return;
    }

    const newUsers = [...users, { ...formData }];
    setUsers(newUsers);
    updateAuthFile(newUsers);
    setFormData({ email: '', password: '', name: '' });
    setIsAdding(false);
    showMessage('success', 'Usuário adicionado com sucesso!');
  };

  const handleEditUser = (index: number) => {
    if (!formData.email || !formData.password || !formData.name) {
      showMessage('error', 'Preencha todos os campos');
      return;
    }

    const newUsers = [...users];
    newUsers[index] = { ...formData };
    setUsers(newUsers);
    updateAuthFile(newUsers);
    setFormData({ email: '', password: '', name: '' });
    setEditingIndex(null);
    showMessage('success', 'Usuário atualizado com sucesso!');
  };

  const handleDeleteUser = (index: number) => {
    if (users.length <= 1) {
      showMessage('error', 'Não é possível remover o último usuário');
      return;
    }

    if (confirm('Tem certeza que deseja remover este usuário?')) {
      const newUsers = users.filter((_, i) => i !== index);
      setUsers(newUsers);
      updateAuthFile(newUsers);
      showMessage('success', 'Usuário removido com sucesso!');
    }
  };

  const startEdit = (index: number) => {
    setFormData({ ...users[index] });
    setEditingIndex(index);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setFormData({ email: '', password: '', name: '' });
    setEditingIndex(null);
    setIsAdding(false);
  };

  const updateAuthFile = (newUsers: AuthorizedUser[]) => {
    // Nota: Em uma aplicação real, isso seria feito no backend
    // Por enquanto, apenas atualizamos o estado local
    console.log('Usuários atualizados:', newUsers);
    showMessage('success', 'Alterações salvas! Para persistir, edite o arquivo config/authorizedUsers.ts manualmente.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <i className="fa-solid fa-users-gear mr-3"></i>
            Gerenciamento de Usuários
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Message */}
          {message && (
            <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              <i className={`fa-solid ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
              {message.text}
            </div>
          )}

          {/* Add/Edit Form */}
          {(isAdding || editingIndex !== null) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {editingIndex !== null ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome Completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="usuario@lucasseminovos.com.br"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="senha123"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editingIndex !== null ? handleEditUser(editingIndex) : handleAddUser()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <i className="fa-solid fa-save mr-2"></i>
                  {editingIndex !== null ? 'Salvar Alterações' : 'Adicionar Usuário'}
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Add Button */}
          {!isAdding && editingIndex === null && (
            <button
              onClick={() => setIsAdding(true)}
              className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <i className="fa-solid fa-user-plus mr-2"></i>
              Adicionar Novo Usuário
            </button>
          )}

          {/* Users Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Senha</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900 font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <code className="bg-slate-100 px-2 py-1 rounded">{'•'.repeat(user.password.length)}</code>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => startEdit(index)}
                        className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition-colors"
                        title="Editar"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(index)}
                        className="text-red-600 hover:bg-red-50 px-3 py-1 rounded transition-colors"
                        title="Remover"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Warning */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <i className="fa-solid fa-triangle-exclamation text-yellow-600 mr-3 mt-1"></i>
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Importante:</p>
                <p>
                  As alterações feitas aqui são temporárias e serão perdidas ao recarregar a página. 
                  Para persistir as mudanças, edite manualmente o arquivo <code className="bg-yellow-100 px-1 rounded">config/authorizedUsers.ts</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
